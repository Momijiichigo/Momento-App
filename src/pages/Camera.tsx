import { A } from "@solidjs/router";
import { Component } from "solid-js";

export const CameraPage: Component = () => {
    return <div>
        <A href="/">Home</A>
        <label for="selfie">Take a picture of your face:</label>
        <input type="file" id="selfie" name="selfie" accept="image/*" capture="user" />
        <label for="picture">Take a picture using back facing camera:</label>
        <input type="file" id="picture" name="picture" accept="image/*" capture="environment" />
    </div>
}