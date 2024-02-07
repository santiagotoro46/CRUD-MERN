export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        // se usa con el fin de que solo nos muestre los errores.
        return res.status(400).json( error.errors.map((error) => error.message) );
    }
}