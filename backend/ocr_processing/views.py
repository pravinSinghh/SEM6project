# from django.shortcuts import render

# # Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from .ocr_utils import run_ocr_on_image

class OCRAPIView(APIView):
    def post(self, request):
        image = request.FILES.get('image')
        if not image:
            return Response({'error': 'No image provided'}, status=400)

        text = run_ocr_on_image(image)
        return Response({'extracted_text': text})
