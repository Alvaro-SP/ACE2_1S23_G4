#include <SoftwareSerial.h>
#include <ArduinoJson.h>
#include <dht.h>
#include <Wire.h>
#include <SPI.h>
#include <Adafruit_BMP280.h>
#define BMP280_ADDRESS 0x76
Adafruit_BMP280 bmp; // I2C

dht DHT;
#define DHT11_PIN 7

#define sensorPower 8
#define sensorPin A0

#define boton 4
#define relay 3

long duration;
int distance;
float waterlevel;

int estado;
int cont = 0;

const int trig = 9;
const int echo = 10;

//Initialize Arduino to NodeMCU connection (5=Rx & 6=Tx)
SoftwareSerial nodemcu(5, 6);

void setup() {
  Serial.begin(9600);
  nodemcu.begin(9600);
  while ( !Serial ) delay(100);   // wait for native usb
  unsigned status;
  status = bmp.begin(BMP280_ADDRESS);

  bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,     /* Operating Mode. */
              Adafruit_BMP280::SAMPLING_X2,     /* Temp. oversampling */
              Adafruit_BMP280::SAMPLING_X16,    /* Pressure oversampling */
              Adafruit_BMP280::FILTER_X16,      /* Filtering. */
              Adafruit_BMP280::STANDBY_MS_500); /* Standby time. */

  pinMode(sensorPower, OUTPUT);
  digitalWrite(sensorPower, LOW);

  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);

  pinMode(boton, INPUT);
  pinMode(relay, OUTPUT);
  digitalWrite(relay, HIGH);
}

void loop() {
  StaticJsonBuffer<1000> jsonBuffer;
  JsonObject& data = jsonBuffer.createObject();

  while (nodemcu.available()) {
    char val = nodemcu.read();
    Serial.println(val);
    if(val == 'O'){
      digitalWrite(relay, LOW); 
    } else if (val == 'F'){
      digitalWrite(relay, HIGH); 
    }
  }
  Serial.println(digitalRead(relay));
  
  digitalWrite(sensorPower, HIGH);
//  delay(10);  |
  int chk = DHT.read11(DHT11_PIN);
  int moisture = analogRead(sensorPin);
  data["tempIn"] = DHT.temperature;
//  digitalWrite(sensorPower, LOW);

  float valMoist = (-0.2)*(moisture-900);
  if(valMoist < 0){
    valMoist = 0;
  }
  if(valMoist > 100){
    valMoist = 100;
  }
  
  Serial.print("Moisture: ");
  Serial.print(valMoist);
  Serial.println("%");
  
  Serial.print(F("Temperature DHT = "));
  Serial.print(DHT.temperature);
  Serial.println(" *C");
  
  Serial.print(F("Temperature BMP = "));
  Serial.print(bmp.readTemperature());
  Serial.println(" *C");

  Serial.print(F("Water Level = "));
  waterlevel = calculateDistance();
  Serial.print(waterlevel);
  Serial.println("%");
  
  Serial.println("--------------------");

  data["waterlevel"] = waterlevel;
  data["moisture"] = valMoist;
  data["tempOut"] = bmp.readTemperature();

  if(cont == 2){
    data.printTo(nodemcu);
    jsonBuffer.clear();
    cont = 0;
  } else {
    cont++;
  }
  delay(1000);
}


float calculateDistance(){ 
  digitalWrite(trig, LOW); 
  delayMicroseconds(2);
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trig, HIGH); 
  delayMicroseconds(10);
  digitalWrite(trig, LOW);
  duration = pulseIn(echo, HIGH); // Reads the echoPin, returns the sound wave travel time in microseconds
  distance = duration*0.034/2;
  waterlevel = (-4.7619)*(distance)+(123.8095); 
  return waterlevel;
}
