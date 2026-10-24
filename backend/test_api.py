"""
DermaScan Backend API Automated Tests
Runs integration tests against the FastAPI application.
"""

import io
import unittest
from PIL import Image
from fastapi.testclient import TestClient

from main import app


class TestDermaScanApi(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)

    def create_dummy_image(self, format: str = "JPEG", size=(224, 224)) -> bytes:
        img = Image.new("RGB", size, color=(200, 180, 160))
        buf = io.BytesIO()
        img.save(buf, format=format)
        return buf.getvalue()

    def test_01_health_check(self):
        response = self.client.get("/api/v1/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "healthy")
        self.assertIn("is_model_loaded", data)
        self.assertIn("supported_classes", data)
        self.assertEqual(len(data["supported_classes"]), 7)

    def test_02_predict_valid_image(self):
        img_bytes = self.create_dummy_image()
        response = self.client.post(
            "/api/v1/predict",
            files={"file": ("lesion.jpg", img_bytes, "image/jpeg")}
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["scan_id"].startswith("scan_"))
        self.assertIn("prediction", data)
        self.assertIn("class_name", data["prediction"])
        self.assertIn("confidence", data["prediction"])
        self.assertGreater(data["prediction"]["confidence"], 0.0)
        self.assertEqual(len(data["prediction"]["probabilities"]), 7)
        self.assertIn("model", data)
        self.assertIn("image_data_url", data)

        # Store for subsequent retrieval test
        self.__class__.created_scan_id = data["scan_id"]

    def test_03_predict_empty_file(self):
        response = self.client.post(
            "/api/v1/predict",
            files={"file": ("empty.jpg", b"", "image/jpeg")}
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("empty", response.json()["detail"].lower())

    def test_04_predict_unsupported_format(self):
        response = self.client.post(
            "/api/v1/predict",
            files={"file": ("test.txt", b"plain text content", "text/plain")}
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("unsupported", response.json()["detail"].lower())

    def test_05_get_scan_history(self):
        response = self.client.get("/api/v1/scans")
        self.assertEqual(response.status_code, 200)
        scans = response.json()
        self.assertIsInstance(scans, list)
        self.assertGreaterEqual(len(scans), 1)

    def test_06_get_specific_scan(self):
        scan_id = getattr(self.__class__, "created_scan_id", None)
        if not scan_id:
            self.skipTest("No scan ID created in test_02")
        
        response = self.client.get(f"/api/v1/scans/{scan_id}")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["scan_id"], scan_id)

    def test_07_delete_scan(self):
        scan_id = getattr(self.__class__, "created_scan_id", None)
        if not scan_id:
            self.skipTest("No scan ID created in test_02")

        delete_response = self.client.delete(f"/api/v1/scans/{scan_id}")
        self.assertEqual(delete_response.status_code, 200)
        self.assertTrue(delete_response.json()["success"])

        # Subsequent fetch must return 404
        fetch_response = self.client.get(f"/api/v1/scans/{scan_id}")
        self.assertEqual(fetch_response.status_code, 404)


if __name__ == "__main__":
    unittest.main()
