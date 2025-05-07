package models

type CardData struct {
	CardNumber string `json:"card_number"`
	CVV        string `json:"cvv"`
	Expiry     string `json:"expiry"`
}
