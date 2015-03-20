from rest_framework import serializers
from taggit.models import Tag

from projects.models import Project
from categories.models import Category


class CategorySerializer(serializers.ModelSerializer):
    def to_representation(self, obj):
        return obj.name

    class Meta:
        model = Category


class TagSerializer(serializers.ModelSerializer):
    def to_representation(self, obj):
        return obj.name

    class Meta:
        model = Tag


class ProjectSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True)
    tags = TagSerializer(many=True)

    class Meta:
        model = Project
        fields = (
            'name',
            'description',
            'image',
            'date',
            'link',
            'categories',
            'tags',
        )
