from rest_framework import serializers

class FeatureFilterSerializer(serializers.Serializer):
    """Validador para filtros de características"""
    features = serializers.ListField(
        child=serializers.CharField(),
        required=False,
        help_text='Lista de características a analizar'
    )
    limit = serializers.IntegerField(
        default=100,
        min_value=1,
        max_value=1000,
        help_text='Límite de registros a retornar'
    )

class ClassFilterSerializer(serializers.Serializer):
    """Validador para filtros por clase"""
    class_name = serializers.ChoiceField(
        choices=['normal', 'anomaly'],
        help_text='Clase a filtrar: normal o anomaly'
    )
