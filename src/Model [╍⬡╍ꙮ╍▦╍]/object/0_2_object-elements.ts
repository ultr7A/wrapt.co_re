import { ObjectType }        from "../../Domain [╍🌐╍🧭╍]/object/object-type.enum.js";
import { ConceptExpression } from "../../Domain [╍🌐╍🧭╍]/syntax/0_1_0_structure-concept.js";

import { GraphOperator } from "../syntax/1_1_0_expression-elements.js";
import { EObject, FunctionObject } from "./0_0_object-structure.js";

export class ClassMethodObject {
    constructor(
        public Key: string,
        public Value: FunctionObject,
        public modifiers: number[] = []
    ){}
}

export class ClassPropertyObject {
    constructor(
        public Key: string,
        public Value: EObject,
        public modifiers: number[] = [],
    ) {} 
}


export interface IGraphObject<V extends EObject, EdgeOperatorType = GraphOperator> {
    Nodes: GraphNodeObject<V, EdgeOperatorType>[];
    Edges: GraphEdgeObject<V, EdgeOperatorType>[];
}

export class GraphNodeObject<V extends EObject, O = GraphOperator> implements EObject {
    public Type() { return ObjectType.GRAPH_NODE_OBJECT; }

    constructor(public Graph: IGraphObject<V, O>, public Value: V, public Id: string) { }
    
    public Inspect() {
        return this.Value.Inspect();
    }
}


export class GraphEdgeObject<V extends EObject, O = GraphOperator> implements EObject {
    public Type() { return ObjectType.GRAPH_EDGE_OBJECT; }

    constructor(
        public Graph: IGraphObject<V, O>, 
        public From: string,
        public To: string,     
        public Operator: O
    ) { }

    public Inspect(indentLevel?: number) {
        return this.Graph.Nodes.find(node => node.Id === this.From).Inspect()
               + " || \n" //TODO: Make this not happen at this level,
               + " || \n" //TODO: {    {as in,} 
               + " \\/"   //TODO:      (do this) {{/(?:at|through)/} [/.*/ implementing GraphObject]}     }
    }
}


export class ConceptOperatorObject implements EObject {

    constructor(
        public Operator: ConceptExpression,
        public readonly Precedence: number
    ) {}

    public Type() { return ObjectType.CONCEPT_OPERATOR_OBJECT; }
    // TODO: inspect ConceptOperatorObject
    public Inspect() { return "TODO: inspect ConceptOperatorObject /!\\"; };
}