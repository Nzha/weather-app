# weather-app
Application to display weather for a location

Warning: The site works properly locally, but when published on the GitHub page, the map only displays the base layer from openstreetmap.org and not the additional layers from openweathermap.org. This is because the map request from openweathermap.org seems to require HTTP, while the GitHub page requires HTTPS. A potential solution is to use a custom domain and uncheck "Enforce HTTPS" in the GitHub page settings.