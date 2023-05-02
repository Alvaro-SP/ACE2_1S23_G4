#include <SoftwareSerial.h>
#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

//D6 = Rx & D5 = Tx
SoftwareSerial nodemcu(12, 14);

#define SERIAL_PORT 9600

#define SERVER_IP "192.168.0.16:8000"

#ifndef STASSID
#define STASSID "FamEsquivelDiaz2"
#define STAPSK "4NJ667302597"
#endif


void setup() {
  Serial.begin(SERIAL_PORT);
  nodemcu.begin(SERIAL_PORT);
  
  Serial.println("Establishing serial communication on port:" + SERIAL_PORT);
  while (!Serial){
    delay(20);
  }
  Serial.println("Serial communication established");
   
  Serial.println();
  Serial.println();
  Serial.println();

  Serial.println("Connecting to WiFI");
  WiFi.begin(STASSID, STAPSK);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());

}

void loop() {
  StaticJsonBuffer<1000> jsonBuffer;
  JsonObject& data = jsonBuffer.parseObject(nodemcu);

  if (data == JsonObject::invalid()) {
    Serial.print("-");
    jsonBuffer.clear();
    return;
  }
  String result;
  data.printTo(result);
  postPetition(result);  
}



void postPetition(String JSON_OBJECT){
  WiFiClient client;
  HTTPClient http;

  Serial.print("[HTTP] begin...\n");
  // configure traged server and url
  http.begin(client, "http://" SERVER_IP "/data");  // HTTP
  http.addHeader("Content-Type", "application/json");

  Serial.print("[HTTP] POST...\n");
  // start connection and send HTTP header and body
  int httpCode = http.POST(JSON_OBJECT);

  // httpCode will be negative on error
  if (httpCode > 0) {
    // HTTP header has been send and Server response header has been handled
    Serial.printf("[HTTP] POST... code: %d\n", httpCode);

    // file found at server
    if (httpCode == HTTP_CODE_OK) {
      const String& payload = http.getString();
      Serial.println("received payload:\n<<");
      Serial.println(payload);
      Serial.println(">>");

      StaticJsonBuffer<1000> jsonBuffer;
      JsonObject& data = jsonBuffer.parseObject(payload);

      if(data["state"] == 1){
        nodemcu.print("O");
      } else {
        nodemcu.print("F");
      }
      
    }
  } else {
    Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
  }

  http.end();
}
