import { enquirySchema } from "@/lib/validation/enquiry";
import { createEnquiry } from "@/lib/queries/enquiries";

//Handles post requests to api
export async function POST(request: Request) {
    let body: unknown;
    // read JSON body
    try { 
        body = await request.json();
    } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400,
        });
    }

        // Validates body against schema
    const validated = enquirySchema.safeParse(body);
    
    // Returns error if fails vaildation
    if (!validated.success) {
        return Response.json(
            {
                success: false,
                errors: validated.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            },
            { status: 400 }
        );
    }
    try {
        // Pass the validated data to the database query module
        const result = await createEnquiry(validated.data);
         // Return new enquiry ID if successfull
        return Response.json(
            {
                sucess: true,
                message: "Enquiry was created successfully",
                enquiryId: result.enquiryId,
            },
            { status: 201 }
        );

         // Logs and returns any erros 
    } catch (error) {
        console.error("Error creating enquiry:", error);
        return Response.json(
            {
                success: false,
                message: "Unabe to submit enquiry."
            },
            { status: 500 }
        );
        
    }
}