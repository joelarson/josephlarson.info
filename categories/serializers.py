from rest_framework import serializers

from categories.models import Category


class CategorySerializer(serializers.ModelSerializer):
    def to_representation(self, obj):
        return obj.name

    class Meta:
        model = Category
