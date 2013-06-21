import unittest

from db import DBConnector
from model import Count

class CountTestCase(unittest.TestCase):
    def setUp(self):
        self.c = Count()

    def test_a_get(self):
        self.assertTrue()

    def test_b_get(self):
        self.assertTrue(True)

if __name__ == "__main__":
    unittest.main()
