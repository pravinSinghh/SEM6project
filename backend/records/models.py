from django.db import models

class PatientRecord(models.Model):
    name = models.CharField(max_length=255)
    age = models.IntegerField()
    diagnosis = models.TextField()
    admission_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
