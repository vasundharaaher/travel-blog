// not found
export default (req, res) => {
    res.status(404).json({
        success: false,
        msg: 'Requested resource is no longer available !',
    });
}

