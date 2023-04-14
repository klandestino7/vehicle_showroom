local glm = require 'glm'

-- Cache common functions
local glm_rad = glm.rad
local glm_quatEuler = glm.quatEulerAngleZXY
local glm_forward = glm.forward
local glm_lerp = glm.lerp

exports("glm_rad", glm_rad)
exports("glm_lerp", function(camCoords, position, factor)

    camCoords = vec3(camCoords[1], camCoords[2], camCoords[3])
    position = vec3(position.x, position.y, position.z)

    print("camCoords", camCoords)
    print("position", position)
    print("factor", factor)

    local result = glm_lerp(camCoords, position, factor)

    print("result", result)
    return {result.x, result.y, result.z}
end)

exports("glm_quatEuler", function(...)
    local result = glm_quatEuler(...)

    return result
end)
exports("glm_forward", glm_forward)


exports("glm_direction", function(angleX, angleY)
    local rotation = glm_quatEuler(glm_rad(-(angleX)), glm_rad(-(angleY)), 0.0)

    --[[ Direção a partir da rotação ]]
    local direction = rotation * glm_forward()

    return {direction.x, direction.y, direction.z}
end)