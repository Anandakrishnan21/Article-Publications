import Paper from "@/models/Paper";
import { connection } from "@/utils/db";
import { NextResponse } from "next/server";


export const PUT = async(req,{params}) =>{
    const {id} = params;
    const {newTitle:title, newAuthor1: author1, newAuthor2: author2, newAuthor3: author3, 
    newAuthor4: author4, newAuthor5: author5, newDept: dept, newJournal: journal, newPubYear: pubYear, newIssn: issn,
    newIssue: issue, newPageNo: pageno, newDoi: doi, newMonth: month} = await req.json();
    await connection();
    await Paper.findByIdAndUpdate(id, {title,author1,author2,author3, author4, author5, month, issn,doi, dept, pubYear,journal, issue, pageno});
    return NextResponse.json({ message: "Paper Updated"}, {status: 200});
}

export const GET = async(req, {params}) => {
    const {id} = params;
    await connection();
    const paper = await Paper.findOne({ _id: id});
    return NextResponse.json({paper}, {status: 200});
}