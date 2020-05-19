import app from "./app";
process.env.TZ = 'Asia/Kolkata';
// const PORT = process.env.NODE_ENV === 'production' ? 80 : 4300;
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})