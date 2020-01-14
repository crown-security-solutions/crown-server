import app from "./app";
const PORT = process.env.NODE_ENV === 'production' ? 80 : 4000;

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})