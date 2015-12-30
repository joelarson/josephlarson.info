from rest_framework import viewsets
from rest_framework.exceptions import NotFound
import django_filters

from ..serializers import CategorySerializer, ProjectSerializer
from ..models import Project


class ProjectFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(name='categories__name',
                                         lookup_type='iexact')

    class Meta:
        model = Project


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = 'slug'
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_class = ProjectFilter
    filter_fields = [field.name for field in Project._meta.get_fields()]
