from rest_framework import serializers
from .models import Note, Preacher, Sermon
from django.contrib.auth.models import User

class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = ['id','title', 'description']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username"]

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User(username= validated_data['username'], email=validated_data['email'])
        user.set_password(validated_data['password'])

        user.save()
        return user

# class SermonCreationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Sermon
#         fields = ['title', 'preacher', 'youtube_url', 'note']
#         read_only_fields = ["uploaded_by"]

class SermonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sermon
        fields = ['title', 'preacher', 'youtube_url', 'note', 'uploaded_by']
