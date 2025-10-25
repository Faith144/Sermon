from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
import logging

logger = logging.getLogger(__name__)


class CookiesJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Try to get token from cookie
        access_token = request.COOKIES.get("access_token")

        if not access_token:
            logger.debug("No access_token cookie found")
            logger.debug(f"Available cookies: {list(request.COOKIES.keys())}")
            return None

        try:
            # Validate the token
            validated_token = self.get_validated_token(access_token)
            # Get user from validated token
            user = self.get_user(validated_token)
            return (user, validated_token)

        except AuthenticationFailed as e:
            logger.warning(f"JWT Authentication failed: {e}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error during JWT authentication: {e}")
            return None
