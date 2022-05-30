export = (req:any, res:any, next:any) => 
{
    return res.status(200).json({code: 1, message: "Cliente para Amazon Lex"});
}