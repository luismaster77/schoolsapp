export class PathUtil {
    public static getPathParams(parameters: any): string {
        let fields: string[] = Object.getOwnPropertyNames(parameters);
        let path: string = "?";
        fields.forEach(
            (field: string, i: number) => {
                let value: any = Object.values(parameters)[i];
                if (i > 0 && path != "?" && (value != null && value.toString().trim()!="")) {
                    path += "&";
                }
                if (value != null && value.toString().trim()!="") {
                    path += (field + "=" + value);
                }
            }
        );
        return (path!="?"?path:"");
    }
}