#include <dht.h>
#include <Wire.h>
#include <SPI.h>
#include <Adafruit_BMP280.h>
#define BMP280_ADDRESS 0x76
Adafruit_BMP280 bmp; // I2C
#include <math.h>       /* log */

dht DHT;
#define DHT11_PIN 7


int N = 14;
int NO = 15;
int O = 16;
int SO = 17;
int S = 18;
int SE_ = 19;
int E = 20;
int NE = 21;

void direccion(){

  Serial.print("D:");
  
  if (!digitalRead(N)){
    Serial.println("N");
    return;
  }
  if (!digitalRead(NE)){
    Serial.println("NE");
    return;
  }
  if (!digitalRead(NO)){
    Serial.println("NO");
    return;
  }
  if (!digitalRead(O)){
    Serial.println("O");
    return;
  }
  if (!digitalRead(SO)){
    Serial.println("SO");
    return;
  }
  if (!digitalRead(S)){
    Serial.println("S");
    return;
  }
  if (!digitalRead(E)){
    Serial.println("E");
    return;
  }
  if (!digitalRead(SE_)){
    Serial.println("SE");
    return;
  }
  Serial.println("E");
}

void setup(){
  Serial.begin(9600);
  while ( !Serial ) delay(100);   // wait for native usb
  unsigned status;
  status = bmp.begin(BMP280_ADDRESS);

  /* Wait for BMP280 to respond. */
//  if (!status) {
//    Serial.println(F("Could not find a valid BMP280 sensor, check wiring or "
//                      "try a different address!"));
//    Serial.print("SensorID was: 0x"); Serial.println(bmp.sensorID(),16);
//    Serial.print("        ID of 0xFF probably means a bad address, a BMP 180 or BMP 085\n");
//    Serial.print("   ID of 0x56-0x58 represents a BMP 280,\n");
//    Serial.print("        ID of 0x60 represents a BME 280.\n");
//    Serial.print("        ID of 0x61 represents a BME 680.\n");
//    while (1) delay(100);
//  }

  /* Default settings. */
  bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,     /* Operating Mode. */
                  Adafruit_BMP280::SAMPLING_X2,     /* Temp. oversampling */
                  Adafruit_BMP280::SAMPLING_X16,    /* Pressure oversampling */
                  Adafruit_BMP280::FILTER_X16,      /* Filtering. */
                  Adafruit_BMP280::STANDBY_MS_500); /* Standby time. */

  pinMode(N, INPUT);
  pinMode(NO, INPUT);
  pinMode(O, INPUT);
  pinMode(SO, INPUT);
  pinMode(S, INPUT);
  pinMode(SE_, INPUT);
  pinMode(E, INPUT);
  pinMode(NE, INPUT);
}

void loop(){
  int chk = DHT.read11(DHT11_PIN);

  // Magnus Coefficients 
  float a = 17.625; 
  float b = 243.04;

  float T = DHT.temperature; // Temperature (C) - DHT11
//  float T = bmp.readTemperature(); // Temperature (C) - BMP280
  float RH = DHT.humidity; // Relative Humidity (%) - DHT11
  float P = bmp.readPressure(); // Preassure (Pa) - BMP280
  float MH = (0.833)*(T) + 5; // Max Humidity (g/m3)
  //float MH = 25.833; // Max Humidity (g/m3)
  float AH = (RH * MH)/100; // Absolute Humidity (g/m3)

  float al = log(RH/100)+(a*T)/(b+T);
  float DP = (b * al)/(a - al); // Dewpoint (C)
  
  int analogV = analogRead(A0); //Analog value output from motor
  float V = analogV * 1.70; // Wind Velocity (km/h)  

  float mmHg = P * 0.0075; // Preassure in mmHg

  Serial.println("start");
  Serial.print("T:");
  Serial.println(T);
  Serial.print("R:");
  Serial.println(RH);
  Serial.print("A:");
  Serial.println(AH);
//  Serial.print(DP);
  Serial.print("P:");
  Serial.println(mmHg);
  Serial.print("V:");
  Serial.println(V);
  direccion();
  
  Serial.println("end");
  delay(5000);
}
