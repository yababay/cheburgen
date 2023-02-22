export interface SeoProperties {

    keywords: string
    robots: string
    description: string
    title: string
    author: string
    og_type: string
    og_title: string
    og_description: string
    og_image: string
    og_url: string
    og_site_name: string
    year: number
}

export interface RenderingSettings {

    isDebug: boolean
    srcDir: string
    docsDir: string
    libDir: string
    typesDir: string
    distDir: string
    pagesDir: string
    publicDir: string
    stylesDir: string
    iconsDir: string
    assetsDir: string

    useReadme: boolean
    useRollup: boolean
    linkRoot: string
    httpPort: number

    libPrefix: string
    typesPrefix: string

    mimetypes: Map<string, string>
    extensions: string[]
    seo: SeoProperties
}
