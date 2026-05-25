import z from "zod";

export const GeoCodeSchema = z.object({
    LongLabel: z.string(),
    City: z.string(),
    CntryName: z.string(),
    InputX: z.number(),
    InputY: z.number(),
});

const BaseSchema = z.object({
    title: z.string().min(1, { message: "El Titulo es Obligatorio" }),
    details: z.string().min(50, { message: "Añade más detalles al Evento" }),
    image: z.url({ protocol: /^https?$/, hostname: z.regexes.domain, error: 'La imagen es obligatoria' }),
    communityId: z.uuid({ message: "Elige Una Comunidad" }),
    availableSeats: z.number().min(1, { error: 'El Cupo debe ser Mayor a 0' }),
    date: z.iso.date({ message: "Añade una Fecha" }),
    time: z.string().min(1, { message: "La Hora es Obligatoria" }),
    categoryId: z.uuid({ message: "Elige Una Categoría" }),
});

const MeetiLocationSchema = z.object({
    placeName: z.string().min(1, { message: "El Nombre del Lugar es obligatorio" }),
    address: z.string().min(1, { message: "La Dirección Lugar es obligatoria" }),
    city: z.string().min(1, { message: "La ciudad es obligatoria" }),
    country: z.string().min(1, { message: "El país es obligatorio" }),
    lat: z.number({ error: 'Ubicación no válida' }).min(-90, { error: 'Ubicación no válida' }).max(90, { error: 'Ubicación no válida' }),
    lng: z.number({ error: 'Ubicación no válida' }).min(-90, { error: 'Ubicación no válida' }).max(90, { error: 'Ubicación no válida' })
});

const VirtualMeetiSchema = BaseSchema.extend({
    virtual: z.literal(true),
});

const PhysicalMeetiSchema = BaseSchema.extend({
    virtual: z.literal(false),
    location: MeetiLocationSchema,
});

export const MeetiSchema = z.discriminatedUnion("virtual", [
    VirtualMeetiSchema,
    PhysicalMeetiSchema,
]);

export type MeetiInput = z.infer<typeof MeetiSchema>;