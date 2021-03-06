from rest_framework import serializers

from taggit.models import Tag

from .models import Project, Category


class TagSerializer(serializers.ModelSerializer):
    def to_representation(self, obj):
        return obj.name

    class Meta:
        model = Tag


class CategorySerializer(serializers.ModelSerializer):
    def to_representation(self, obj):
        return obj.name

    class Meta:
        model = Category


class ProjectSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True)
    tags = TagSerializer(many=True)
    date = serializers.DateField(format='%b %Y')

    class Meta:
        model = Project
        fields = (
            'id',
            'name',
            'description',
            'image',
            'date_verb',
            'date',
            'version',
            'link',
            'categories',
            'tags',
        )
