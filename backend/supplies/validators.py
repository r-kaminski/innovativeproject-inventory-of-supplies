from django.core.exceptions import ValidationError

def validate_repletion(value):
    if value > 100:
        raise ValidationError("% - repletion value too high")