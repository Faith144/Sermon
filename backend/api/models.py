from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField

# Create your models here.

class Note(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    created_at = models.DateField(
        auto_now_add=True
    )
    
    def __str__(self):
        return self.title

class Preacher(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name

class Sermon(models.Model):
    title = models.CharField(max_length=200)
    preacher = models.ForeignKey(Preacher, on_delete=models.CASCADE, related_name='sermons')
    youtube_url = models.URLField()
    note = models.OneToOneField(Note, on_delete=models.DO_NOTHING)
    date_uploaded = models.DateField(auto_now_add=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    def __str__(self):
        return self.title


class Telegram_audio(models.Model):
    title = models.CharField(max_length=200)
    # Change from FileField to CloudinaryField
    audio_file = CloudinaryField(
        resource_type="auto",  # 'auto' detects audio/video automatically
        folder="sermon_audios/",  # Optional: organize files in folder
    )
    date_uploaded = models.DateField(auto_now_add=True)
    uploaded_by = models.ForeignKey("auth.User", on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.title

    @property
    def audio_url(self):
        """Get the Cloudinary URL for the audio file"""
        return self.audio_file.url
