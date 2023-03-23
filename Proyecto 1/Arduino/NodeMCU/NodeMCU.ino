#include <SoftwareSerial.h>
#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

//D6 = Rx & D5 = Tx
SoftwareSerial nodemcu(12, 14);


int buzzer = 13;

#define SERIAL_PORT 9600

#define SERVER_IP "3.15.186.222:5000"

#ifndef STASSID
#define STASSID "FamEsquivelDiaz2"
#define STAPSK "4NJ667302597"
#endif

int state = 0;  // 0 = setup
                // 1 = runnning

int restTime = 5;   // minutes
int workTime = 45;  // minutes

int restTimeSeg = 300;   // seconds
int workTimeSeg = 1500;  // seconds

int currentTimeSeg = 0;  // seconds
int currentTimeMin = 0;  // minutes

int potValue = 0;

int pomodoro = 0;
// 1 -> Trabajo 1
// 2 -> Descanso 1
// 3 -> Trabajo 2
// 4 -> Descanso 2
// 5 -> Trabajo 3
// 6 -> Descanso 3
// 7 -> Trabajo 4
// 8 -> Descanso 4


void setup() {
  // Initialize Serial port
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

  pinMode(buzzer, OUTPUT) ;
}

void loop() {
  
  if (state == 0){
    setupState();
  } else {
    workState();
  }
  
}


void setupState(){
  StaticJsonBuffer<1000> jsonBuffer;
  JsonObject& data = jsonBuffer.parseObject(nodemcu);

  if (data == JsonObject::invalid()) {
    Serial.print("-");
    jsonBuffer.clear();
    return;
  }

  int resetState = data["reset"];
  if(resetState == 1){
    Serial.println("Reset");
    state = 0;
    workTime = 25;
    restTime = 5;
    return;
  }

  int stateButton = data["button"];
  int timer = data["time"];

  if(stateButton == 1){
    tone(buzzer, 659) ;
    delay (1046);
    noTone(buzzer) ;
    
    state = 1;
    workTimeSeg = workTime * 60;
    restTimeSeg = restTime * 60;
    currentTimeSeg = workTimeSeg -1 ;
    currentTimeMin = workTime - 1;
    pomodoro = 1; 
  }

  if (timer != potValue){
    potValue = timer;
    workTime = timer;
  }

  String JSON_OBJECT = "{\"button\":" + String(stateButton) + " ,\"time\":" + workTime + ",\"state\": " + state + "}";
  postPetition("http://192.168.0.14:5000/data", JSON_OBJECT);
}

void workState(){
  StaticJsonBuffer<1000> jsonBuffer;
  JsonObject& data = jsonBuffer.parseObject(nodemcu);

  if (data == JsonObject::invalid()) {
    Serial.print("-");
    jsonBuffer.clear();
    return;
  }
//
  int resetState = data["reset"];
  if(resetState == 1){
    Serial.println("Reset");
    state = 0;
    workTime = 25;
    restTime = 5;
    return;
  }

  int stateButton = data["button"];

  String JSON_OBJECT = "{\"button\":" + String(stateButton) + " ,\"state\": " + state + ",\"pomodoro\": " + pomodoro + "}";
  postPetition("http://192.168.0.14:5000/data", JSON_OBJECT);

  String mensaje = "";
  if( currentTimeSeg == 0){
    changePomodoro();
    return;
  }

  int segundos = currentTimeSeg % 60;
  if( currentTimeSeg % 60 == 0){
    currentTimeMin --;
  }
  if(currentTimeMin < 0){
    currentTimeMin = 0;
  }
  currentTimeSeg--;

  if(pomodoro % 2 == 0){
    mensaje += "Descansando*" + String(currentTimeMin) + "min " + String(segundos) + "seg";
  } else {
    mensaje += "Trabajando*" + String(currentTimeMin) + "min " + String(segundos) + "seg";
  }
  nodemcu.print(mensaje);
}

void changePomodoro(){
  if(pomodoro == 8){
    nodemcu.print("#");
    state = 0;
    return;
  }
  
  if(pomodoro % 2 == 0){
    currentTimeSeg = workTimeSeg -1 ;
    currentTimeMin = workTime - 1; 
  } else {
    currentTimeSeg = restTimeSeg -1 ;
    currentTimeMin = restTime - 1;
  }
  pomodoro++;
  
}

void postPetition(String URL, String JSON_OBJECT){
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
     
      if(state == 0 && data["type"] == "clock"){
        workTime = data["work"];
        restTime = data["rest"];
        nodemcu.print(workTime);
      }
    }
  } else {
    Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
  }

  http.end();
}
