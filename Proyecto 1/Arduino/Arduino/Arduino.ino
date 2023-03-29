
#include <SoftwareSerial.h>
#include <ArduinoJson.h>
#include <Wire.h> 
#include <LiquidCrystal_I2C.h>
const int pinButton = 7;
const int resetButton = 4;
int cont = 0;
int buzzer = A1;

//Initialise Arduino to NodeMCU (5=Rx & 6=Tx)
SoftwareSerial nodemcu(5, 6);

//Initialise I2C Display
LiquidCrystal_I2C lcd(0x27,20,4);

int potPin = A0;

int workTime = 25;  // seconds

int potValue = 0;
int received = 0;

int state = 0;

void setup() {
  Serial.begin(9600);
  lcd.init();
  lcd.init();
  lcd.backlight();
  nodemcu.begin(9600);
  delay(1000);
  pinMode(pinButton, INPUT);
  pinMode(resetButton, INPUT);
  lcd.setCursor(0,0);
  lcd.println("Program started");
  pinMode(buzzer, OUTPUT) ;
}

void loop() {

  if (state == 0){
    setupState();
  } else{
    workState();
  } 
}

bool first2 = true;

void setupState(){

  StaticJsonBuffer<1000> jsonBuffer;
  JsonObject& data = jsonBuffer.createObject();
  
  int stateButton = digitalRead(pinButton);
  int resetState = digitalRead(resetButton);

  int value = analogRead(potPin);
  float timePot = (2.580645) * value;
  int minutos = (timePot / 60) + 1;

  String inString = "";
  
//  while (nodemcu.available()) {
//    int inChar = nodemcu.read();
//    inString += (char)inChar;
//  }

  first2 = true;

  while (nodemcu.available()) {
    int inChar = nodemcu.read();
    if(first2){
      workTime = inChar - 48;
      first2 = false;
    }else{
      workTime = workTime*10;
      workTime = workTime + inChar - 48;
    }
    Serial.println(inChar);
  }
  if(inString != ""){
    Serial.println(inString);
    workTime = inString.toInt();
  }

  if(stateButton == 1){
    state = 1;
  }

  if (minutos < 1){
    minutos = 1;
  }
 
  if (potValue != minutos){
    workTime = minutos;
    potValue = minutos;
  }

  lcd.clear();
  lcd.print("SETUP");
  lcd.setCursor(0,1);
  lcd.print("Tiempo: ");
  lcd.print(workTime);
  lcd.print(" min");

  data["button"] = stateButton;
  data["time"] = minutos;
  data["reset"] = resetState;

  //Send data to NodeMCU
  if(cont == 5){
    data.printTo(nodemcu);
    jsonBuffer.clear();
    cont = 0;
    
    if(resetState == 1){
      rState();
      state = 0;
    }
  } else {
    cont++;
  }
  delay(200);
}


  bool first = true;
  bool finish = false;
  bool startRest = true;
  
void workState(){

  StaticJsonBuffer<1000> jsonBuffer;
  JsonObject& data = jsonBuffer.createObject();
  
  int stateButton = digitalRead(pinButton);
  int resetState = digitalRead(resetButton);
  
  String cadena = "";
  while (nodemcu.available()) {
    char character = nodemcu.read();
    
    if(first){
      lcd.clear();
      first = false;
      
      if(character == 'D'){
        if(!startRest){
          tone(buzzer, 659) ;
          delay(500);
          noTone(buzzer) ;
          startRest = true;
        }
      }

      if(character == 'T'){
        if(startRest){
          tone(buzzer, 659) ;
          delay(500);
          noTone(buzzer) ;
          delay(500);
          tone(buzzer, 659) ;
          delay(500);
          noTone(buzzer) ;
          startRest = false;
        }
      }
    }
    
    

    if(character == '*'){
      lcd.setCursor(0,1);
    }else if(character == '#'){
      finish = true;
      lcd.clear();
      break;
    }else{
      lcd.print(character);
    }
  }
  first = true;
  Serial.println("----------------");

  if(finish){
    finish = false;
    state = 0;
    return;
  }

  data["button"] = stateButton;
  data["reset"] = resetState;

  //Send data to NodeMCU
  if(cont == 5){
    data.printTo(nodemcu);
    jsonBuffer.clear();
    cont = 0;
    
    if(resetState == 1){
      rState();
      state = 0;
    }
    
    
  } else {
    cont++;
  }

  
  delay(200);

  
}


void rState(){
  workTime = 25;
  int showBlink = 0;
  while(showBlink < 3){
    lcd.clear();
    lcd.print("RESET");
    lcd.setCursor(0,1);
    lcd.print("TRABAJO: 25 MIN");
    delay(2000);
    lcd.clear();
    lcd.print("RESET");
    lcd.setCursor(0,1);
    lcd.print("DESCANSO: 5 MIN");
    delay(2000);
    showBlink++;
  }
  workTime = 25;
}
