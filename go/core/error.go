package core

type CheapsharkError struct {
	IsCheapsharkError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewCheapsharkError(code string, msg string, ctx *Context) *CheapsharkError {
	return &CheapsharkError{
		IsCheapsharkError: true,
		Sdk:              "Cheapshark",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *CheapsharkError) Error() string {
	return e.Msg
}
