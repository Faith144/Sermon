from django.db import models
from django.contrib.auth.models import User

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
    preacher = models.ForeignKey(Preacher, on_delete=models.CASCADE, related_name='preacher')
    youtube_url = models.URLField()
    note = models.OneToOneField(Note, on_delete=models.DO_NOTHING)
    date_uploaded = models.DateField(auto_now_add=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    def __str__(self):
        return self.title

class Telegram_audio(models.Model):
    title = models.CharField(max_length=200)
    audio_file = models.FileField(upload_to='telegram_audios/')
    date_uploaded = models.DateField(auto_now_add=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    
    def __str__(self):
        return self.title