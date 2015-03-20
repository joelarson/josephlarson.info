from rest_framework import viewsets
from rest_framework.exceptions import NotFound

from main import serializers
from projects.models import Project


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows Divisions to be viewed.
    """
    lookup_field = 'slug'
    queryset = Project.objects.all()
    serializer_class = serializers.ProjectSerializer
    filter_fields = Project._meta.get_all_field_names()
