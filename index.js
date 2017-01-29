"use strict";
/**
 * Wrap
 */
function wrap(option) {
    return [
        function (req, res, next) {
            if (res.data) {
                var data = res.data;
                var opt = { offset: option.offset || 0, limit: option.limit || 25 };
                res.json({
                    code: 200,
                    message: "success",
                    href: "".concat(req.protocol, "://", req.hostname, req.baseUrl, req.url),
                    offset: Array.isArray(data) ? parseInt(req.query.offset || opt.offset) : undefined,
                    limit: Array.isArray(data) ? parseInt(req.query.limit || opt.limit) : undefined,
                    count: Array.isArray(data) ? data.length : undefined,
                    data: data
                });
            }
            else {
                next(res.error);
            }
        }, function (req, res, next) {
            res.error = { status: 404, message: "Not Found", name: "NotFound" };
            next(res.error);
        }, function (err, req, res, next) {
            if (res.error) {
                res.json({
                    code: res.error.status || 500,
                    message: res.error.message || "Internal Error"
                });
            }
            else if (err) {
                res.json({
                    code: err.status || 500,
                    message: err.message || "Internal Error"
                });
            }
        }
    ];
}
exports.wrap = wrap;
