# Устанавливаем базовый образ для Adminer (веб-интерфейс)
FROM adminer:latest AS adminer

# Экспонируем порт для Adminer
EXPOSE 8080

# Устанавливаем рабочую директорию
WORKDIR /app

# Указываем команду для запуска Adminer
CMD ["php", "-S", "0.0.0.0:8080", "-t", "/var/www/html"]