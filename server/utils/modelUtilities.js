exports.report = (obj) => {
    obj.reports = obj.reports ? obj.reports + 1 : 1;

    if (obj.reports >= 10) obj.isSuspended = true;

    obj.save();
};
