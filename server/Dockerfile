FROM python:3.8

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN apt-get update -qqy && apt-get install -qqy libopenblas-dev gfortran
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

ENTRYPOINT [ "python" ]

EXPOSE 5000

CMD [ "app.py" ]