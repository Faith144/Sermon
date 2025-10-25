from django.contrib import admin
from .models import Note, Sermon, Preacher

# Register your models here.
admin.site.register(Note)
admin.site.register(Sermon)
admin.site.register(Preacher)
