package main

import (
	"card-app/api/config"
	"card-app/api/handlers"
	"log"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadENV()

	r := gin.Default()
	r.POST("/submit-card", handlers.SubmitCard)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server is running on port %s", port)
	r.Run(":" + port)
}
