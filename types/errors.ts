export interface Errorable {
    message: string
    status: number
}

class RenderingError extends Error implements Errorable {

    #status: number

    constructor(message: string, status = 500){
        super(message)
        this.#status = status
    }

    get message(){
        return super.message
    }

    get status(){
        return this.#status
    }
}


export const ERROR_INTERNAL_RESOURCE_IS_NOT_FOUND = (url: string) => new RenderingError(`Не удалось найти внутренний ресурс ${url}.`, 404)
export const ERROR_TEMPLATE_NOT_FOUND = (url: string) => new RenderingError(`Не удалось найти шаблон ${url}.`, 404)
export const ERROR_MARKDOWN_NOT_FOUND = (url: string) => new RenderingError(`Не удалось найти файл markdown ${url}.`, 404)
export const ERROR_ILLEGAL_MIME_TYPE  = (url: string) => new RenderingError(`Ресурсы данного типа не обслуживаются: ${url}.`, 406)
export const ERROR_NO_RENDERER_FOUND           = (url: string) => new RenderingError(`Не удалось найти обработчик для ресурса ${url}.`, 404)

/*
export const ERROR_STATIC_FILE_NOT_FOUND       = (url: string) => new RenderingError(`Не удалось найти файл ${url}.`, 404)
export const ERROR_CSS_IS_INCORRECT            = (url: string) => new RenderingError(`Ошибка при обработке стилевых таблиц: ${url}.`, 500)
export const ERROR_NO_PRODUCTION_ID            = (url: string) => new RenderingError(`Не обнаружен ключ для генерации статических файлов: ${url}.`, 500)
export const ERROR_RENDERER_IS_NOT_IMPLEMENTED = (className: string, methodName: string) => new RenderingError(`Класс ${className} является абстрактным или метод ${methodName} еще не реализован.`, 500)
*/
