from django.shortcuts import render

import django_filters
from rest_framework import viewsets

from .models import Project, Category
from .serializers import CategorySerializer, ProjectSerializer


class ProjectFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(name='categories__name', lookup_type='iexact')  # noqa

    class Meta:
        model = Project


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    # lookup_field = 'slug'
    queryset = Project.objects.all().order_by('-date')
    serializer_class = ProjectSerializer
    filter_class = ProjectFilter
    filter_fields = [field.name for field in Project._meta.get_fields()]


def app(request):
    return render(request, 'app.html')
