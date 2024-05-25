export const Constants = {
    // DB
    DATABASE_URL:
        process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/test',
    // Backend
    BACKEND_PORT: +process.env.BACKEND_PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || null,
}
