package config

import (
	"log"

	"github.com/joho/godotenv"
)

func LoadENV() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found. Using environement variables")
	}
}
