from django.db import models
from django.conf import settings

class Prescription(models.Model):
    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    doctor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='doctor_prescriptions')
    date_issued = models.DateField(auto_now_add=True)
    image = models.ImageField(upload_to='prescriptions/')
    extracted_text = models.TextField(blank=True, null=True)  # From OCR
    summary = models.TextField(blank=True, null=True)         # From AI summarizer

    def __str__(self):
        return f'Prescription for {self.patient.username} on {self.date_issued}'
