from django.contrib import admin
from .models import Note, Sermon, Preacher, Telegram_audio
from django.contrib.auth.models import Group

# Register your models here.
admin.AdminSite.site_header = "Sermon Administration"
admin.AdminSite.site_title = "Sermon Admin Portal"
admin.AdminSite.index_title = "Welcome to the Sermon Admin Portal"
admin.AdminSite.unregister(Group)

admin.site.register(Note)
admin.site.register(Sermon)
admin.site.register(Preacher)
admin.site.register(Telegram_audio)
