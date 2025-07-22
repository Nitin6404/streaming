FROM alfg/nginx-rtmp

COPY nginx.conf /etc/nginx/nginx.conf

# Override CMD to skip envsubst template replacement
CMD ["nginx", "-g", "daemon off;"]
