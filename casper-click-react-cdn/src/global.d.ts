
export {};

declare global {
    interface Window {
        csprclick?: any;
    }
}

declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
}