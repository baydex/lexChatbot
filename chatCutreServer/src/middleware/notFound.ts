export = (req:any, res:any, next:any)=> {
    return res.status(404).json({code: 404, message: "URL no encontrada"});
}